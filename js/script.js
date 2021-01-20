window.onload = function()
{
    tikTakBoom.init(
        tasks,
        document.getElementById('timerField'),
        document.getElementById('gameStatusField'),
        document.getElementById('questionField'),
        document.getElementById('answer1'),
        document.getElementById('answer2'),
        document.getElementById('start'),
        document.getElementById('stop')
    )
    // tikTakBoom.start();
    document.getElementById('start').addEventListener('click', tikTakBoom.objstart);
}
