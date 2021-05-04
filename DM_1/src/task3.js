'use strict';
import validSchema from './validSchema.js';

export default function arrangeTrianglesBySquare(arr) {

  function calculateSquareOfTriangle(triangle) {
    let vertices = triangle.vertices.toLowerCase();
    let a = +triangle[vertices.slice(0, 1)];
    let b = +triangle[vertices.slice(1, 2)];
    let c = +triangle[vertices.slice(2, 3)];
    let p = (a + b + c) / 2;
    return Math.sqrt(p * (p - a) * (p - b) * (p - c)).toFixed(2);
  }

  let invalidTriangle = arr.find(triangle => validSchema.isValidVerticesName(triangle) !== true);

  if (invalidTriangle === undefined) {
    let trianglesMap = new Map();
    let arrangedTriangles = [];

    let isMap = arr.map(triangle => {
      let square = calculateSquareOfTriangle(triangle);
      const isNaN = validSchema.isAdequacy(+square, triangle.vertices); // проверка на адекватность треугольника
      if (isNaN === true) {
        trianglesMap.set(triangle, square);
        return true;
      } else {
        return isNaN;
      }
    });
    let err = isMap.filter(el => el !== true);
    if (err.length !== 0) {
      return JSON.stringify(err[0]);
    } else {
      let res = [...trianglesMap.entries()].sort((a, b) => b[1] - a[1]);
      res.forEach(name => arrangedTriangles = [...arrangedTriangles, name[0].vertices]);
      return arrangedTriangles;
    }
  } else {
    return JSON.stringify(validSchema.isValidVerticesName(invalidTriangle));
  }
}





