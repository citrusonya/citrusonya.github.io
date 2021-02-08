// 
// Svg container animation
//
  let line1Data = [
    [0, .7],
    [.1, .8],
    [.2, .75],
    [.3, .5],
    [.4, .3],
    [.5, .35],
    [.6, .42],
    [.7, .7],
    [.8, .75],
    [.9, .65],
    [1, .55]
  ];
  
  let line2Data = [
    [0, .5],
    [.1, .3],
    [.2, .4],
    [.3, .25],
    [.4, .5],
    [.5, .4],
    [.6, .5],
    [.7, .4],
    [.8, .45],
    [.9, .4],
    [1, .55]
  ];

  let line3Data = [
    [0, .5],
    [.05, .4],
    [.1, .4],
    [.2, .3],
    [.3, .25],
    [.4, .35],
    [.5, .6],
    [.6, .7],
    [.7, .4],
    [.8, .22],
    [.9, .1],
    [1, .15]
  ];

  // Generate an svg path 
  function generateSvgPath(data, colorClass) {
    let svgPath = `<path class="dashboard-panel__chart-line ${colorClass}" d="`
    let startCP;
    let endCP;
    data.forEach((dot, i) => {
      if (i !== 0) {
        startCP = controlPoint(data[i - 1], data[i - 2], dot);
        endCP = controlPoint(dot, data[i - 1], data[i + 1], true);
      }
      svgPath += i === 0 ? 'M ' : 'C ';
      svgPath += i === 0 ? `${dot[0]},${dot[1]} ` : `${startCP.x},${startCP.y} ${endCP.x},${endCP.y} ${dot[0]},${dot[1]} `
    })
    // Close the chart for filling color
    svgPath += `L 843 480 L 0 480 L ${data[0][0]},${data[0][1]} "></path>`
    return svgPath;
  }
  
  // Get length and angle between two points
  // Reference: https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
  const line = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointA[1]
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX)
    }
  }
  
  // Get a control point for curve line
  // Reference: https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
  const controlPoint = (current, previous, next, reverse) => {
    const p = previous || current
    const n = next || current
    const smoothing = 0.15
    const o = line(p, n)
    const angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing
    const x = current[0] + Math.cos(angle) * length
    const y = current[1] + Math.sin(angle) * length
    return {x, y};
  }
  
  const addLineToSVG = (data, color) => {
     // scale the data
    data = data.map(item => [item[0] *843, item[1] * 480]);
    let line = generateSvgPath(data, color);
    $('#chart-container').append(line);
    $('#chart-container').html($('#chart-container').html());
      // append doesn't refresh svg, this is why:
    // https://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
  }

  const removeLineToSVG = (data) => {
    // scale the data
   data = data.map(item => [item[0] *0, item[1] * 0]);
   let line = generateSvgPath(data);
   $('#chart-container').append(line);
   $('#chart-container').html($('#chart-container').html());
     // append doesn't refresh svg, this is why:
   // https://stackoverflow.com/questions/3642035/jquerys-append-not-working-with-svg-element
 }

// 
// Animation when loading document
//

  $(document).ready(async ()=>{
    if ($('#add-steps').is(':checked')){
      addLineToSVG(line1Data, 'line-steps');
      $('.line-steps').addClass('draw');
      $('.open-tooltip-1').addClass('active');
    }
  })

// 
// Switches svg lines
//

  $('#add-activity').on('click', function(){
    if($('#add-activity').prop('checked')){
      addLineToSVG(line1Data, 'line-steps');
      $('.line-steps').addClass('draw');
      addLineToSVG(line2Data, 'line-puls');
      $('.line-puls').addClass('draw');
      addLineToSVG(line3Data, 'line-water');
      $('.line-water').addClass('draw');
      $('.open-tooltip').addClass('active');
    }else{
      $('.line-puls').remove();
      $('.line-water').remove();
      $('.open-tooltip-2').removeClass('active');
      $('.dashboard-panel__tooltip').removeClass('active');
      $('#add-puls').prop('checked', false);
      $('#add-water').prop('checked', false);
    }    
  });

  $('#add-steps').on('click', function(){
    if($('#add-steps').prop('checked')){
      addLineToSVG(line1Data, 'line-steps');
      $('.line-steps').addClass('draw');
      $('.open-tooltip-1').addClass('active');
    }else{
      $('.line-steps').remove();
      $('.open-tooltip-1').removeClass('active');
      $('.dashboard-panel__tooltip_1').removeClass('active');
    }    
  });

  $('#add-puls').on('click', function(){
    if($('#add-puls').prop('checked')){
      addLineToSVG(line2Data, 'line-puls');
      $('.line-puls').addClass('draw');
    }else{
      $('.line-puls').remove();
    }    
  });

  $('#add-water').on('click', function(){
    if($('#add-water').prop('checked')){
      addLineToSVG(line3Data, 'line-water');
      $('.line-water').addClass('draw');
      $('.open-tooltip-2').addClass('active');
    }else{
      $('.line-water').remove();
      $('.open-tooltip-2').removeClass('active');
      $('.dashboard-panel__tooltip_2').removeClass('active');
    }   
  });

// 
// Switches sub menu
//

  $('#open-tooltip-activity').on('click', function(){
    $('.dashboard-panel__tooltip_1').toggleClass('active');
  });
  $('#open-tooltip-water').on('click', function(){
    $('.dashboard-panel__tooltip_2').toggleClass('active');
  });

  $('.row__col_1').on('click', function(e) {
    e.preventDefault();
    $('.row__col_1').removeClass('active');
    $(this).addClass('active');
    let itemId = $(this).attr('id');
    $('.table').removeClass('active');
    $('.table[id=' + itemId + ']').addClass('active');
  });

  $('.row__col_2').on('click', function(e) {
    e.preventDefault();
    $('.row__col_2').removeClass('active');
    $(this).addClass('active');
    let itemId = $(this).attr('id');
    $('.item').removeClass('active');
    $('.item[id=' + itemId + ']').addClass('active');
  });

  let expanded = false;

  $('#selectBox').on('click', function(){
    let checkboxes = document.getElementById("checkboxes");
      if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
      } else {
        checkboxes.style.display = "none";
        expanded = false;
      }
  })

//
// Buttons for opening the menu
//

  $('.link').on('click', function(e) {
    e.preventDefault();
    $('.dashboard-content').removeClass('active');
    $('.link').removeClass('active');
    $(this).addClass('active');
    let itemId = $(this).attr('data-link-id');
    $('.dashboard-block').removeClass('active');
    $('.dashboard-content').addClass('active');
    $('.dashboard-panel').removeClass('active');
    $('.dashboard-block[data-content-id=' + itemId + ']').addClass('active');
  });

//
// Сlosing the menu when clicking outside the work area
//

  $(document).click( function(event){
    if( $(event.target).closest(".dashboard-sidebar").length || $(event.target).closest(".dashboard-content").length ) 
        return;
        $('.dashboard-content').removeClass('active');
        $('.dashboard-panel').addClass('active');
        event.stopPropagation();
});

// 
// Checkboxes
//

  $(window).keyup(function(e){
    var target = $('.checkbox input:focus');
    if (e.keyCode == 9 && $(target).length){
      $(target).parent().addClass('focused');
    }
  });
   
  $('.checkbox input').focusout(function(){
    $(this).parent().removeClass('focused');
  });