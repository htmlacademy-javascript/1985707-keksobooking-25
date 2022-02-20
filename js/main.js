function getRandomInt(min, max) {
  if(min>=max || min<0 || max<0){
    return 'Диапазон введен некорректно!';
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(0,3);

function getRandomFloat(min, max, n) {
  if(min>=max || min<0 || max<0){
    return 'Диапазон введен некорректно!';
  }

  return (Math.random() * (max - min) + min).toFixed(n);
}

getRandomFloat(0,3,1);
