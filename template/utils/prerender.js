export const startPrerender = () => {
  const script = document.createElement('script')
  script.innerHTML = 'window.prerenderReady = false;'
  document.head.appendChild(script)
}

export const stopPrerender = () => {
  const script = document.createElement('script')
  script.innerHTML = 'window.prerenderReady = true;'
  document.body.appendChild(script)
}
