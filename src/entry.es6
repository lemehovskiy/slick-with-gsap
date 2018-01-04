require("./sass/style.scss");

require("../node_modules/slick-carousel/slick/slick.scss");

import "gsap";

let $ = require("jquery");

require('slick-carousel');


$('h1').each(function (index) {
    let characters = $(this).text().split("");
    let $this = $(this);

    $this.empty();
    $.each(characters, function (i, el) {
        $this.append("<span>" + el + "</span>");
    });

});

$(document).ready(function () {

    let $demo_slider = $('.demo-slider');

    $demo_slider.slick({
        slidesToShow: 1,
        dots: false,
        arrows: false
    });


    //create timeline arr
    let time_lines_arr = [];
    let time_lines_arr_full = [];

    $('.slick-slide').each(function () {

        let $this = $(this);

        let title = $this.find('h1 span');

        let tl = new TimelineMax();

        tl.pause();

        tl.staggerFrom(title, 1, {opacity: 0}, 0.1);

        //push all slides
        time_lines_arr_full.push(tl);

        //push only if not cloned
        if (!($this.hasClass('slick-cloned'))) {
            time_lines_arr.push(tl);
        }
    })


    //play intro slide
    time_lines_arr[0].play();


    $demo_slider.on('afterChange', function (event, slick, currentSlide) {

        //pause all timelines
        time_lines_arr_full.forEach(function(item){
            item.pause();
            item.progress(0);
        })

        //play current timeline
        time_lines_arr[currentSlide].play();

    });

})