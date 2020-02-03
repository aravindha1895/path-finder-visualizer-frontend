import { Component, OnInit } from "@angular/core";
import { ShortestPathService } from "../../service/shortest-path.service";
@Component({
  selector: "app-shortest-path",
  templateUrl: "./shortest-path.component.html",
  styleUrls: ["./shortest-path.component.css"]
})
export class ShortestPathComponent implements OnInit {
  inputMatrix = [];
  isMouseDown: boolean;
  isMouseOver: boolean;
  isErasePath: string;
  isSetSource: boolean;
  isSetDestination: boolean;
  source = [];
  dest = [];
  noRows = window.screen.height / 15;
  noCols = window.screen.width / 15;

  animationSpeed = 1;
  primaryColor = "olivedrab";
  SecondaryColor = "firebrick";

  constructor(private shortestPathService: ShortestPathService) {}

  ngOnInit() {
    this.reset();
  }
  reset() {
    for (let i = 0; i < this.noRows; i++) {
      this.inputMatrix[i] = [];
      for (let j = 0; j < this.noCols; j++) {
        this.inputMatrix[i].push(1);
      }
      this.source = [];
      this.dest = [];
    }
    this.isMouseDown = false;
    this.isMouseOver = false;
    this.isSetSource = false;
    this.isSetDestination = false;
    this.isErasePath = "none";
  }
  findPath() {
    // getShortestDistance(this.inputMatrix,this.noRows,this.noCols,this.source[0],this.source[1],this.dest[0],this.dest[1]);
    this.shortestPathService
      .getShortestPath(
        this.inputMatrix,
        this.noRows,
        this.noCols,
        this.source[0],
        this.source[1],
        this.dest[0],
        this.dest[1]
      )
      .subscribe(res => {
        console.log(res);
        if (res["distance"] != -1) {
          this.paintAllNodesVisited(res["pathTrace"]);
          this.paintNodesAlongShortestPath(res["shortestPathTrace"]);
          alert("Shortest distance is " + res["distance"]);
        } else {
          alert("No path exists between the given source and destination.");
        }
      });
  }

  paintAllNodesVisited(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      const [row, col] = nodes[i];
      if (
        (row == this.source[0] && col == this.source[1]) ||
        (row == this.dest[0] && col == this.dest[1])
      )
        continue;
      const cellStyle = document.getElementById(row + "_" + col)["style"];
      setTimeout(() => {
        cellStyle.backgroundColor = this.SecondaryColor;
      }, 0.8);
    }
  }
  paintNodesAlongShortestPath(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      const [row, col] = nodes[i];
      if (
        (row == this.source[0] && col == this.source[1]) ||
        (row == this.dest[0] && col == this.dest[1])
      )
        continue;
      const cellStyle = document.getElementById(row + "_" + col)["style"];
      setTimeout(() => {
        cellStyle.backgroundColor = this.primaryColor;
      }, 2);
    }
  }
  returnClassName(row, col) {
    if (
      this.source.length != 0 &&
      this.source[0] == row &&
      this.source[1] == col
    )
      return "path-source";
    if (this.dest.length != 0 && this.dest[0] == row && this.dest[1] == col)
      return "path-dest";
    if (this.inputMatrix[row][col] == 0) return "path-block";
    else return "path-clear";
  }
  onMouseDown(event, i, j) {
    if (this.isSetSource) {
      this.source = [];
      this.source.push(i);
      this.source.push(j);
      return;
    }
    if (this.isSetDestination) {
      this.dest = [];
      this.dest.push(i);
      this.dest.push(j);
      return;
    }
    this.isMouseDown = true;
    if (this.isErasePath == "e") this.inputMatrix[i][j] = 1;
    else if (this.isErasePath == "c") this.inputMatrix[i][j] = 0;
  }
  onMouseOver(event, i, j) {
    if (this.isMouseDown == true) {
      if (this.isErasePath == "e") this.inputMatrix[i][j] = 1;
      else if (this.isErasePath == "c") this.inputMatrix[i][j] = 0;
    }
  }
  onMouseUp() {
    this.isMouseDown = false;
    this.isErasePath = "none";
    this.isSetSource = false;
    this.isSetDestination = false;
  }
}
