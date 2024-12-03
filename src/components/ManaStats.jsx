import { useEffect, useRef } from "react";
import * as d3 from "d3";

function ManaStats({ deck }) {
  const svgRef = useRef(null);

  useEffect(() => {
    // Группируем карты по стоимости маны
    const manaMap = deck.reduce((acc, card) => {
      const cost = card.cmc || 0; // Используем CMC для определения стоимости маны
      const key = cost >= 7 ? "7+" : cost; // Группируем стоимость 7+ в отдельную категорию
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += card.count; // Учитываем количество карт
      return acc;
    }, {});

    // Преобразуем объект в массив для D3
    const data = Object.keys(manaMap).map((cost) => ({
      cost,
      count: manaMap[cost],
    }));

    const margin = { top: 30, right: 30, bottom: 70, left: 60 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    svgRef.current.innerHTML = ""; // Очистка перед рендерингом
    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Ось X
    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.cost))
      .padding(0.2);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Ось Y
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.count) || 1])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    // Построение баров
    svg
      .selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.cost))
      .attr("y", (d) => y(d.count))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.count))
      .attr("fill", "#69b3a2");

    // Заголовки и подписи
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .text("MTG Deck Mana Cost Distribution");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -height / 2)
      .text("Number of Cards");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + margin.bottom - 10)
      .text("Mana Cost");
  }, [deck]);

  return <div id="manaStats" ref={svgRef}></div>;
}

export { ManaStats };
