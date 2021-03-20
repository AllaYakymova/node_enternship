"use strict";

// Вывести треугольники в порядке убывания их площади.
// Входные параметры: массив объектов треугольник
// Выход: упорядоченный массив имён треугольников
// Примечание:
// • Расчёт площади треугольника должен производится по формуле Герона.
// • Каждый треугольник определяется именами вершин и длинами его сторон.
// • Приложение должно обрабатывать ввод чисел с плавающей точкой:
// {
//   vertices: ‘ABC’,
//   a: 10,
//   b: 20,
//   c: 22.36
// }

function calculateSquareOfTriangle(triangle) {
  let vertices =  triangle.vertices.toLowerCase();
  let a = +triangle[vertices.slice(0,1)];
  let b = +triangle[vertices.slice(1,2)];
  let c = +triangle[vertices.slice(2,3)];
  let p = (a + b + c) / 2;
  return Math.sqrt(p * (p - a) * (p - b) * (p - c)).toFixed(2);
}

export default function arrangeTrianglesBySquare(arr) {
  let trianglesMap = new Map();
  let arrangedTriangles = [];
  arr.forEach(triangle => {
    let square = calculateSquareOfTriangle(triangle);
    trianglesMap.set(triangle.vertices, square);
  });
  let res = [...trianglesMap.entries()].sort((a, b) => b[1] - a[1]);
  res.forEach(name => arrangedTriangles = [...arrangedTriangles, name[0]]);
  console.log(arrangedTriangles);
  return arrangedTriangles;
}
