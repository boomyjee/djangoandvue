<template>
  <div id='chart'></div>
</template>

<script>
import * as d3 from 'd3'
import { mapActions } from 'vuex'

const COLORS = {
  positive: '#28a745',
  negative: '#dc3545',
  neutral: '#cccccc'
}

export default {
  name: 'D3Chart',

  computed: {
    data: function() {
      return this.$store.state.reviewsStats.stats
    }
  },

  created() {
    this.getStats()
  },

  watch: {
    data() {
      this.drawSvg()
    }
  },

  methods: {
    ...mapActions({
      getStats: 'reviewsStats/getStats'
    }),
    
    drawSvg() {
      const svg = d3.select('#chart').html("").append('svg')
          .attr('width', 1000)
          .attr('height', 600)

      const margin = { top: 20, right: 20, bottom: 30, left: 40 }
      
      const width = parseInt(svg.attr("width")) - margin.left - margin.right
      const height = parseInt(svg.attr("height")) - margin.top - margin.bottom

      const x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
      const y = d3.scaleLinear().rangeRound([height, 0])

      const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      x.domain(this.data.map(d => d.mark))
      y.domain([0, d3.max(this.data, d => d.count)])

      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Count")

      g.selectAll(".bar")
        .data(this.data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.mark))
        .attr("y", d => y(d.count))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.count))
        .attr("fill", d => COLORS[d.mark])
        .append("svg:title")
          .text(d => `${d.mark} | ${d.count}`);
    }
   },
}
</script>

<style lang="css">
#chart {
  text-align: center;
}

#chart .bar:hover {
  opacity: .75;
}

#chart .axis--x path {
  display: none;
}
</style>
