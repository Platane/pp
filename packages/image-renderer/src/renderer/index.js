const render = path => {
  switch (path[0]) {
    case 'score':
      renderScore(path[1])
  }
}

const renderScore = score => (document.querySelector('#app').innerText = score)

const { pathname } = location

const path = atob(
  pathname
    .split('/')
    .filter(Boolean)[0]
    .split('.')[0]
).split('/')

render(path)
