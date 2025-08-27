import { useEffect, useRef } from "react";

export default function ForceGraph() {
  const svgRef = useRef(null);

  useEffect(() => {
    let cleanup = () => {};
    let mounted = true;
    (async () => {
      const [
        selection,
        {
          forceSimulation,
          forceLink,
          forceManyBody,
          forceCenter,
          forceCollide,
        },
        drag,
      ] = await Promise.all([
        import("d3-selection"),
        import("d3-force"),
        import("d3-drag"),
      ]);
      if (!mounted || !svgRef.current) return;

      const svg = selection.select(svgRef.current);
      svg.selectAll("*").remove();

      const width = 500;
      const height = 480;

      svg
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height]);

      const defs = svg.append("defs");

      const centerGradient = defs
        .append("radialGradient")
        .attr("id", "centerGradient")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");
      centerGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#6366f1");
      centerGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#4338ca");

      const mainGradient = defs
        .append("radialGradient")
        .attr("id", "mainGradient")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");
      mainGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#10b981");
      mainGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#059669");

      const socialGradient = defs
        .append("radialGradient")
        .attr("id", "socialGradient")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");
      socialGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#f59e0b");
      socialGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#d97706");

      const projectGradient = defs
        .append("radialGradient")
        .attr("id", "projectGradient")
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%");
      projectGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#8b5cf6");
      projectGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#7c3aed");

      const getGradientId = (group) => {
        const gradients = [
          "centerGradient",
          "mainGradient",
          "socialGradient",
          "projectGradient",
        ];
        return `url(#${gradients[group]})`;
      };

      const forceGraphData = {
        nodes: [
          {
            id: "notionpage",
            name: "Hank's Page",
            url: "https://kimhank.oopy.io/",
            type: "center",
            group: 0,
          },
          {
            id: "portfolio",
            name: "Portfolio",
            url: "https://portfolio-seven-azure-73.vercel.app/",
            type: "project",
            group: 1,
          },
          {
            id: "linkedin",
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/huiung-kim-3b1330244/",
            type: "social",
            group: 2,
          },
          {
            id: "github",
            name: "GitHub",
            url: "https://github.com/hank1245",
            type: "social",
            group: 2,
          },
          {
            id: "x",
            name: "X (Twitter)",
            url: "https://x.com/HankKimDev",
            type: "social",
            group: 2,
          },
          {
            id: "instagram",
            name: "Instagram",
            url: "https://www.instagram.com/huiung1/",
            type: "social",
            group: 2,
          },
          {
            id: "blog",
            name: "Blog",
            url: "https://hank1245.github.io/",
            type: "project",
            group: 3,
          },
          {
            id: "ai_creation",
            name: "AI Creation",
            url: "https://www.instagram.com/ai_daramgi/",
            type: "project",
            group: 3,
          },
          {
            id: "directorytracer",
            name: "Directory Tracer",
            url: "https://directorytracer.xyz/",
            type: "project",
            group: 3,
          },
          {
            id: "bedtimestoryteller",
            name: "Bedtime Story Teller",
            url: "https://bedtimestoryteller.rest/",
            type: "project",
            group: 3,
          },
          {
            id: "algorithmplayground",
            name: "Algorithm Playground",
            url: "https://algorithmplayground.vercel.app/",
            type: "project",
            group: 3,
          },
          {
            id: "vocasimple",
            name: "Voca Simple",
            url: "https://endearing-pie-91e6b8.netlify.app/",
            type: "project",
            group: 3,
          },
        ],
        links: [
          { source: "notionpage", target: "portfolio", value: 1 },
          { source: "notionpage", target: "linkedin", value: 1 },
          { source: "notionpage", target: "github", value: 1 },
          { source: "notionpage", target: "x", value: 1 },
          { source: "notionpage", target: "instagram", value: 1 },
          { source: "notionpage", target: "blog", value: 1 },
          { source: "notionpage", target: "ai_creation", value: 1 },
          { source: "portfolio", target: "directorytracer", value: 1 },
          { source: "portfolio", target: "bedtimestoryteller", value: 1 },
          { source: "portfolio", target: "algorithmplayground", value: 1 },
          { source: "portfolio", target: "vocasimple", value: 1 },
        ],
      };

      const simulation = forceSimulation(forceGraphData.nodes)
        .force(
          "link",
          forceLink(forceGraphData.links)
            .id((d) => d.id)
            .distance(80)
        )
        .force("charge", forceManyBody().strength(-300))
        .force("center", forceCenter(width / 2, height / 2))
        .force("collision", forceCollide().radius(25));

      const tooltip = selection
        .select("body")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style(
          "background",
          "linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(55, 65, 81, 0.9))"
        )
        .style("color", "white")
        .style("padding", "12px 16px")
        .style("border-radius", "8px")
        .style("font-size", "14px")
        .style("font-weight", "500")
        .style("pointer-events", "none")
        .style("z-index", "1000")
        .style("box-shadow", "0 4px 12px rgba(0, 0, 0, 0.3)")
        .style("backdrop-filter", "blur(4px)");

      const linkGradient = defs
        .append("linearGradient")
        .attr("id", "linkGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%");
      linkGradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#e5e7eb")
        .attr("stop-opacity", 0.3);
      linkGradient
        .append("stop")
        .attr("offset", "50%")
        .attr("stop-color", "#9ca3af")
        .attr("stop-opacity", 0.8);
      linkGradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "#e5e7eb")
        .attr("stop-opacity", 0.3);

      const link = svg
        .append("g")
        .selectAll("line")
        .data(forceGraphData.links)
        .join("line")
        .attr("stroke", "url(#linkGradient)")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 0.7);

      const node = svg
        .append("g")
        .selectAll("circle")
        .data(forceGraphData.nodes)
        .join("circle")
        .attr("r", (d) => (d.type === "center" ? 20 : 14))
        .attr("fill", (d) => getGradientId(d.group))
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3)
        .style("cursor", "pointer")
        .style("filter", "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))")
        .on("mouseover", function (_, d) {
          tooltip.style(
            "visibility",
            "visible"
          ).html(`<div style="font-weight: 600; margin-bottom: 4px;">${d.name}</div>
                 <div style="font-size: 12px; opacity: 0.8;">${d.type.toUpperCase()}</div>`);
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r", d.type === "center" ? 25 : 18)
            .style("filter", "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))");
        })
        .on("mousemove", function (event) {
          tooltip
            .style("top", event.pageY - 10 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function (_, d) {
          tooltip.style("visibility", "hidden");
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r", d.type === "center" ? 20 : 14)
            .style("filter", "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))");
        })
        .on("click", function (_, d) {
          d3.select(this)
            .transition()
            .duration(100)
            .attr("r", d.type === "center" ? 15 : 10)
            .transition()
            .duration(100)
            .attr("r", d.type === "center" ? 20 : 14);
          window.open(d.url, "_blank");
        })
        .call(
          drag
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

      const label = svg
        .append("g")
        .selectAll("text")
        .data(forceGraphData.nodes)
        .join("text")
        .text((d) =>
          d.name.length > 12 ? d.name.substring(0, 10) + "..." : d.name
        )
        .attr("font-family", "'Inter', 'system-ui', sans-serif")
        .attr("font-size", (d) => (d.type === "center" ? "13px" : "11px"))
        .attr("font-weight", (d) => (d.type === "center" ? "600" : "500"))
        .attr("text-anchor", "middle")
        .attr("dy", (d) => (d.type === "center" ? 35 : 28))
        .attr("fill", "#374151")
        .style("pointer-events", "none")
        .style("text-shadow", "0 1px 2px rgba(255, 255, 255, 0.8)");

      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);
        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        label.attr("x", (d) => d.x).attr("y", (d) => d.y);
      });

      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      cleanup = () => {
        tooltip.remove();
        simulation.stop();
      };
    })();

    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  return (
    <div
      className="w-full bg-gradient-to-br from-white via-gray-50 to-indigo-50 rounded-xl shadow-lg border border-gray-200/50 overflow-hidden relative"
      aria-label="Interactive network graph of links"
    >
      <svg ref={svgRef} className="w-full"></svg>
    </div>
  );
}
