const spawn = require("child_process").spawn;
const Lines = require("./models/lines");

class GStream {
  constructor() {
    this.isStarted = false;
    this.data = [];
    this.streamProcess = null;
    /*
      Every line has (x1, y1) as starting point and (x2, y2) as ending point
     */
    this.lines = [];
    this.loadLines();
  }

  loadLines() {
    // Check database and load previously added lines and store into this.lines array
    Lines.find()
      .sort({ date: -1 })
      .then((lines) => {
        this.lines = lines;
      })
      .catch(() => {
        this.lines = [];
      });
  }

  start() {
    // this.streamProcess = spawn("python3", ["./script/file-to-rtsp.py"]);
    // python3 deepstream_test1_rtsp_out.py -i <h264_elementary_stream>

    /* 
      TODO: HANDLE LINE COMPUTATION ON SERVER SIDE
      * Since handing cmputation function over python stream could lead frame drop causing letency.
      * Even if there is a delay (wrt rtsp stream) it is more efficient. 
     */
    // deepstream_test1_rtsp_in_rtsp_out.py -i rtsp://192.168.1.2:554/1  -g nvinfer
    this.streamProcess = spawn("python3", [
      "./deepstream_test1_rtsp_in_rtsp_out.py",
      "-i rtsp://192.168.1.2:554/1 -g nvinfer",
    ]);
    this.isStarted = true;
    this.streamProcess.stdout.on("data", (data) => {
      // Publish data with a SSE event (can Socket be used??)
      console.log("On Data \n")
      console.log(data.toString());
      // this.data.push(data.toString());
      // this.compareLines(data);
      // this.publish();
    });
    this.streamProcess.stdout.on("error", (err) => {
      console.log("On err \n")
      console.log(err.toString());
    });
  }

  compareLines(data) {
    // Implement whole detection logic here
  }

  publish() {
    // Publish to all connected users
  }

  init() {
    // TODO: Check lines array before executing python file
    this.loadLines();
    this.start();
  }

  stop() {
    // stop this.streamProcess process
    // child.stdin.pause();
    // child.kill();
    this.isStarted = false;
  }

  addLine(line) {
    const newLine = new Lines(line);
    newLine.save(function (err) {
      if (err) {
        return false;
      }
      this.lines.push(line);
      return true;
    });
  }

  addLineAndRestart() {
    const added = this.addLine();
    if (added) {
      this.stop();
      this.start();
    }
  }

  status() {
    return this.isStarted;
  }
}

var GStreamInstance = new GStream();

module.exports = GStreamInstance;
