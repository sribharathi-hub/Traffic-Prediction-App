import { exec } from "child_process";

export default function runJava(mode, input = "") {
  return new Promise((resolve, reject) => {

    const cmd = `"C:\\Program Files\\Java\\jdk-26\\bin\\java.exe" -jar TrafficFlow.jar ${mode} "${input}"`;

    exec(cmd, (err, stdout) => {
      if (err) return reject(err);
      resolve(stdout);
    });

  });
}