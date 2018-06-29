window.addEventListener('load', function () {
  let active = window.location.hash.substring(1) || 'home'
  console.log('active', active)

  window.load_view = async function (view) {
    document.getElementById('main').innerHTML = ''
    // document.getElementById(active).classList.toggle('active')
    // document.getElementById(view).classList.toggle('active')
    active = view
    window.location.hash = active

    const res = await fetch('/info/' + view)
    const html = await res.text()
    main.innerHTML = html

    const scripts = main.getElementsByTagName('script')
    console.log(scripts)

    for (const script of scripts) {
      const newScript = document.createElement('script')
      newScript.src = script.src
      newScript.innerHTML = script.innerHTML
      console.log(newScript)
      setTimeout(() => {
        script.parentNode.appendChild(newScript)
        script.parentNode.removeChild(script)
      })
    }
  }

  window.reload_view = function () {
    return load_view(window.location.hash.substring(1) || 'home')
  }

  window.load_view(active)
})
