const DEFAULT_OPTIONS = [
    {
        name: 'Brightness',
        property: 'brightness',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'

    },
    {
        name: 'Contrast',
        property: 'contrast',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'

    },
    {
        name: 'Saturation',
        property: 'saturate',
        value: 100,
        range: {
            min: 0.00,
            max: 200.00
        },
        unit: '%'

    },
    {
        name: 'Grayscale',
        property: 'grayscale',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: '%'

    },
    {
        name: 'Sepia',
        property: 'sepia',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: '%'

    },
    {
        name: 'HueRotate',
        property: 'hue-rotate',
        value: 0,
        range: {
            min: 0,
            max: 360
        },
        unit: 'deg'

    },
    {
        name: 'Blur',
        property: 'blur',
        value: 0,
        range: {
            min: 0,
            max: 20
        },
        unit: 'px'

    },
]

const sidebarContainer = document.querySelector('.sidebar-container')
const sidebarItem = document.querySelector('.sidebarItem-container')
let activeIndex = 0;
let selectedOption = DEFAULT_OPTIONS[activeIndex];
const slider = document.querySelector('.slider')
const mainImg = document.querySelector('.main-image')
const inputValue = document.querySelector('.inputValue')
// {on change} => bg.style.active[property]  = input.value

inputValue.addEventListener('change', ({ target }) => {
    DEFAULT_OPTIONS[activeIndex] = { ...DEFAULT_OPTIONS[activeIndex], value: target.value }
    selectedOption = DEFAULT_OPTIONS[activeIndex];
    mainImg.style.filter = ''
    DEFAULT_OPTIONS.forEach((option, index) => {


        mainImg.style.filter += `${option.property}(${option.value}${option.unit}) `
        inputValue.value = target.value
        slider.value = target.value


    })
})

slider.addEventListener('input', ({ target }) => {

    // mainImg.style
    DEFAULT_OPTIONS[activeIndex] = { ...DEFAULT_OPTIONS[activeIndex], value: target.value }
    selectedOption = DEFAULT_OPTIONS[activeIndex];
    mainImg.style.filter = ''
    DEFAULT_OPTIONS.forEach((option, index) => {


        mainImg.style.filter += `${option.property}(${option.value}${option.unit}) `
        inputValue.value = target.value


    })


    // console.log(DEFAULT_OPTIONS[activeIndex]);
})

document.addEventListener('click', e => {
    if (e.target.classList[0] == 'sidebarItem') {
        // console.log(e);
        activeIndex = Number(e.target.parentElement.getAttribute('key'))
        console.log(activeIndex);

        let components = document.querySelectorAll('.sidebarItem-container')
        // console.log(components);

        components.forEach((component, index) => {
            if (index == activeIndex) {
                component.setAttribute('active', true)
                component.childNodes[1].classList.add('active')
            } else {
                component.childNodes[1].classList.remove('active')
                component.setAttribute('active', false)

            }
        })

        slider.value = DEFAULT_OPTIONS[activeIndex].value
        inputValue.value = DEFAULT_OPTIONS[activeIndex].value
        slider.min = DEFAULT_OPTIONS[activeIndex].range.min
        slider.max = DEFAULT_OPTIONS[activeIndex].range.max
    }

})

DEFAULT_OPTIONS.map((props, index) => {
    let node = sidebarItem.cloneNode(true)
    node.childNodes[1].innerText = props.name
    node.setAttribute('key', index)
    node.setAttribute('name', props.name)
    node.setAttribute('active', activeIndex === index)

    sidebarContainer.appendChild(node)
})

sidebarContainer.removeChild(sidebarItem)

document.getElementById('download-btn').addEventListener('click', () => {
    const img = document.querySelector('.main-image');
    const canvas = document.createElement('canvas');
    canvas.setAttribute('crossOrigin', 'anonymous')
    const ctx = canvas.getContext('2d');
    const filters = img.style.filter;

    // Set canvas dimensions
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // Apply filters and draw the image on the canvas
    ctx.filter = filters;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Create a link to download the image
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'edited-image.png';
    link.click();
});
