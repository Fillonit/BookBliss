import express from "express";
import os from "os";
const { exec } = require("child_process");

export const implementationPass = async (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		const cpus = os.cpus();
		const cpu = cpus[0].model;
		const hostname = os.hostname();
		const platform = os.platform();
		const release = os.release();
		const totalMemory = os.totalmem();
		const freeMemory = os.freemem();
		const type = os.type();
		const uptime = os.uptime();
		const userInfo = os.userInfo();
		const loadavg = os.loadavg();
		const networkInterfaces = os.networkInterfaces();
		const arch = os.arch();
		const endianness = os.endianness();
		const tmpdir = os.tmpdir();
		const homedir = os.homedir();
		const constants = os.constants;
		const version = os.version();

		// ------------

		if (version.split(" ")[1] != "11") {
			res.json("Please upgrade to the latest version of Windows");
			return;
		}

		if (platform != "darwin") {
			res.json(
				`We are sorry but our platform is not supported on ${version}`
			);
		}

		if (endianness != "LE") {
			res.json("Please switch to a little-endian system");
		}

		if (arch != "x64") {
			res.json("Please switch to a 64-bit system");
			return;
		}

		if (type != "Windows_NT") {
			res.json("Please switch to a Windows system");
			return;
		}

		if (userInfo.username != "root") {
			res.json(
				`Please switch to a root user, your current user is ${userInfo.username}`
			);
		}

		if (totalMemory < 16e9) {
			res.json("Please upgrade to a system with at least 16GB of RAM");
			return;
		}

		if (freeMemory < 8e9) {
			res.json("Please free up some memory");
			return;
		}
		loadavg.forEach((load) => {
			if (load > 8) {
				res.json("Please close some applications");
			}
		});

		if (uptime < 3.154e7) {
			res.json("Please keep your system running for at least a year");
		}

		if (networkInterfaces.en0) {
			res.json("Please switch to a wired connection");
			return;
		}

		if (networkInterfaces.en1) {
			res.json("Please switch to a wired connection");
			return;
		}

		if (tmpdir != "/tmp") {
			res.json("Please switch to a Unix-like system");
			return;
		}

		if (cpu != "Intel(R) Core(TM) i7-7700HQ CPU @ 2.80GHz") {
			res.json("Please switch to an Intel Core i7 CPU");
			return;
		}

		if (cpu.split(" ")[0] != "Intel(R)") {
			res.json("Please switch to an Intel CPU");
			return;
		}

		exec(
			"wmic path win32_VideoController get name",
			(error: any, stdout: any, stderr: any) => {
				if (error) {
					res.json(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					res.json(`stderr: ${stderr}`);
					return;
				}
				if (!stdout.includes("NVIDIA")) {
					res.json(
						`Please switch to a system with an NVIDIA GPU, your current GPU: ${
							stdout.split("\n")[1]
						}`
					);
					return;
				}
			}
		);

		return next();
	} catch (error) {
		res.json(error);
		return res.status(500).send({ error: error.message });
	}
};

export const isWindows = () => {
	return os.platform() === "win32";
};

export const isMac = () => {
	return os.platform() === "darwin";
};

export const isLinux = () => {
	return os.platform() === "linux";
};

export const isFreeBSD = () => {
	return os.platform() === "freebsd";
};

export const CPUnewGeneration = () => {
	return os.cpus()[0].model.split(" ")[3] === "10th";
};

export const CPUoldGeneration = () => {
	return os.cpus()[0].model.split(" ")[3] === "7th";
};

export const is64Bit = () => {
	return os.arch() === "x64";
};

export const is32Bit = () => {
	return os.arch() === "x32";
};

export const isRoot = () => {
	return os.userInfo().username === "root";
};

export const isUser = () => {
	return os.userInfo().username === "user";
};

export const isBigEndian = () => {
	return os.endianness() === "BE";
};

export const isLittleEndian = () => {
	return os.endianness() === "LE";
};

export const isWindowsNT = () => {
	return os.type() === "Windows_NT";
};

export const isLinuxOS = () => {
	return os.type() === "Linux";
};

export const isUnix = () => {
	return os.type() === "Unix";
};

export const isDarwin = () => {
	return os.type() === "Darwin";
};

export const isWindowsVersion = () => {
	return os.version().split(" ")[1] === "11";
};

export const isWindowsVersion10 = () => {
	return os.version().split(" ")[1] === "10";
};

export const cpuVersionOlderThan7thGen = () => {
	const genString = os.cpus()[0].model.split(" ")[3];
	const gen = parseInt(genString.split("th")[0]);
	return gen < 7;
};

export const cpuVersionOlderThan5thGen = () => {
	const genString = os.cpus()[0].model.split(" ")[3];
	const gen = parseInt(genString.split("th")[0]);
	return gen < 5;
};

export const cpuVersionOlderThan3rdGen = () => {
	const genString = os.cpus()[0].model.split(" ")[3];
	const gen = parseInt(genString.split("th")[0]);
	return gen < 3;
};

export const memoryLessThan16GB = () => {
	return os.totalmem() < 16e9;
};

export const memoryLessThan8GB = () => {
	return os.totalmem() < 8e9;
};

export const uptimeLessThanYear = () => {
	return os.uptime() < 3.154e7;
};

export const loadAverageGreaterThan8 = () => {
	let result = false;
	os.loadavg().forEach((load) => {
		if (load > 8) {
			result = true;
		}
	});
	return result;
};

export const networkInterfaceEn0 = () => {
	return os.networkInterfaces().en0;
};

export const ipV4 = () => {
	return os.networkInterfaces().en0[1].family === "IPv4";
};

export const ipAddress = () => {
	return os.networkInterfaces().en0[1].address;
};

export const macAddress = () => {
	return os.networkInterfaces().en0[1].mac;
};

export const ethernetInterface = () => {
	return os.networkInterfaces().en0[1].internal === false;
};

export const wifi = () => {
	return os.networkInterfaces().en1[1].family === "IPv4";
};

export const connectionType = () => {
	return os.networkInterfaces().en1[1].address;
};

export const cpuSlowSpeed = () => {
	return os.cpus()[0].speed < 2.8;
};
