function show() {
    var content = document.getElementsByClassName('hello_word');
    content[0].classList.add('hidden');

    content = document.getElementsByClassName('content');
    content[0].classList.remove('hidden');
    content[0].style.cssText += 'animation: appearContent 1s ease-in-out;';
}
$(function() {
    $("#tabs").tabs();
    $(".panel-title > li").click(function () {
        $('.panel-title > li').removeClass('active');
        $(this).addClass('active')
        }
    );
});
