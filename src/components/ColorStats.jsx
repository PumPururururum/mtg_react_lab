import { useEffect, useRef } from "react";
import * as d3 from "d3";

function ColorStats({ deck }) {
  const svgRef = useRef(null);

  useEffect(() => {
    // Группируем карты по цветам
    const colorMap = deck.reduce((acc, card) => {
      const colors = card.colors || ["Colorless"]; // Карты без цвета помечаем как "Colorless"
      colors.forEach((color) => {
        if (!acc[color]) {
          acc[color] = 0;
        }
        acc[color] += card.count; // Учитываем количество карт
      });
      return acc;
    }, {});

    // Преобразуем объект в массив для D3
    const data = Object.keys(colorMap).map((color) => ({
      color,
      count: colorMap[color],
    }));

    const width = 200;
    const height = 200;
    const radius = Math.min(width, height) / 2;

    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.color))
      .range([
        "#F0E68C",
        "#4682B4",
        "#2F4F4F",
        "#B22222",
        "#228B22",
        "#A9A9A9",
      ]);

    const pie = d3.pie().value((d) => d.count).sort(null);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svgRef.current.innerHTML = ""; // Очистка перед рендерингом

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const arcs = svg
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => colorScale(d.data.color));

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", radius + 20)
      .text("Deck Mana Color Distribution");
  }, [deck]);

  return <div id="colorStats" ref={svgRef}></div>;
}

export { ColorStats };
