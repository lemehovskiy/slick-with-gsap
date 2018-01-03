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

$(document).ready(function(){


    let time_lines_arr = [];

    $('.slick-item').each(function(){

        let $this = $(this);

        let title = $this.find('h1 span');

        let tl = new TimelineMax();

        tl.pause();

        tl.staggerFrom(title, 1, {opacity: 0}, 0.1);

        time_lines_arr.push(tl);
    })


    let $demo_slider = $('.demo-slider');

    $demo_slider.slick({
        slidesToShow: 1,
        dots: false,
        arrows: false
    });


    $demo_slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){

        time_lines_arr[nextSlide].progress(0);
    });

    $demo_slider.on('afterChange', function(event, slick, currentSlide){

        time_lines_arr[currentSlide].play();
    });

})