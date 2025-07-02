<template>
  <div class="conainer">
	<div class="circle_percent" data-percent="20">
    	<div class="circle_inner">
        	<div class="round_per"></div>
        </div>
    </div>

</div>
</template>
<script>
export default {
  mounted() {
    this.$nextTick(() => {
      $('.circle_percent').each(function () {
        const $this = $(this)
        const $dataV = $this.data('percent')
        const $dataDeg = $dataV * 3.6
        const $round = $this.find('.round_per')

        $round.css('transform', 'rotate(' + parseInt($dataDeg + 180) + 'deg)')
        $this.append('<div class="circle_inbox"><span class="percent_text"></span></div>')

        $this.prop('Counter', 0).animate(
          { Counter: $dataV },
          {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
              $this.find('.percent_text').text(Math.ceil(now) + '%')
            }
          }
        )

        if ($dataV >= 51) {
          $round.css('transform', 'rotate(360deg)')
          setTimeout(function () {
            $this.addClass('percent_more')
          }, 1000)
          setTimeout(function () {
            $round.css('transform', 'rotate(' + parseInt($dataDeg + 180) + 'deg)')
          }, 1000)
        }
      })
    })
  }
}
</script>

<style>

.circle_percent {font-size:100px; width:1em; height:1em; position: relative; background: #333; border-radius:50%; overflow:hidden; display:inline-block; margin:20px;}
.circle_inner {position: absolute; left: 0; top: 0; width: 1em; height: 1em; clip:rect(0 1em 1em .5em);}
.round_per {position: absolute; left: 0; top: 0; width: 1em; height: 1em; background: #18AC4F; clip:rect(0 1em 1em .5em); transform:rotate(180deg); transition:1.05s;}
.percent_more .circle_inner {clip:rect(0 .5em 1em 0em);}
/* .percent_more:after {position: absolute; left: .5em; top:0em; right: 0; bottom: 0; background: red; content:'';} */
.circle_inbox {position: absolute; top: 10px; left: 10px; right: 10px; bottom: 10px; background: #fff; z-index:3; border-radius: 50%;}
.percent_text {position: absolute; font-size: 36px; left: 50%; top: 50%; transform: translate(-50%,-50%); z-index: 3;}
</style>
