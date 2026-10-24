const { spawn } = require("node:child_process");
const http = require("node:http");
const net = require("node:net");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const parcelCli = require.resolve("parcel/lib/bin.js");
const jestCli = require.resolve("jest/bin/jest");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function reservePort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const { port } = server.address();
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });

  return port;
}

function isServerReady(url) {
  return new Promise((resolve) => {
    const request = http.get(url, (response) => {
      response.resume();
      resolve(response.statusCode === 200);
    });

    request.setTimeout(500, () => request.destroy());
    request.on("error", () => resolve(false));
  });
}

async function waitForServer(server, url) {
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Parcel exited before becoming ready (code ${server.exitCode}).`);
    }
    if (await isServerReady(url)) return;
    await delay(200);
  }

  throw new Error(`Parcel did not become ready at ${url} within 30 seconds.`);
}

function runTests(url) {
  return new Promise((resolve, reject) => {
    const jest = spawn(
      process.execPath,
      [
        jestCli,
        "--env=puppeteer",
        "--runTestsByPath",
        path.join(projectRoot, "test/solution.test.js"),
        ...process.argv.slice(2),
      ],
      {
        cwd: projectRoot,
        env: { ...process.env, TEST_BASE_URL: url },
        stdio: "inherit",
      }
    );

    jest.once("error", reject);
    jest.once("close", (code, signal) => {
      resolve(code ?? (signal ? 1 : 0));
    });
  });
}

async function main() {
  let parcel;
  try {
    const port = await reservePort();
    const url = `http://127.0.0.1:${port}`;
    parcel = spawn(
      process.execPath,
      [parcelCli, "index.html", `--host=127.0.0.1`, `--port=${port}`],
      { cwd: projectRoot, stdio: "inherit" }
    );

    await waitForServer(parcel, url);
    process.exitCode = await runTests(url);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (parcel && parcel.exitCode === null) {
      parcel.kill("SIGTERM");
      await new Promise((resolve) => parcel.once("close", resolve));
    }
  }
}

main();
