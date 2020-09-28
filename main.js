
	/**
	* @param {HTMLElement} element
	* @param {Object} options.slidesToScroll=1 Nombre d'éléments à faire défiler
	* @param {Object} options.slidesVisible=1 Nombre d'éléments visibles dans le slide
	*/


class caroussel{
	constructor (element, options = {}) {
		this.element = element
		this.options = Object.assign({}, {
			slidesToScroll: 1,
			slidesVisible: 1
		}, options)
		let children = [].slice.call(element.children)
		this.isMobile = false
		this.currentSlide = 0

		//Modification du DOM
		this.root = this.createDivWithClass('caroussel')
		this.container = this.createDivWithClass('caroussel_container')
		this.root.setAttribute('tabindex', '0')
		this.root.appendChild(this.container)
		this.element.appendChild(this.root)
		this.items = children.map((child) => {
			let item = this.createDivWithClass('caroussel_item')
			item.appendChild(child)
			this.container.appendChild(item)
			return item
		})
		this.setStyle()
		this.createNavigation()

		//Evenements
		this.onWindowResize ()
		window.addEventListener('resize', this.onWindowResize.bind(this))
		this.root.addEventListener('keyup', e => {
			if (e.key === 'ArrowRight' || e.key === 'Right') {
				this.next()
			} else if (e.key === 'ArrowLeft' || e.key === 'left') {
				this.prev()
			}
		})
	}

	/**
	 * applique les bonnes dimensions aux images du caroussel
	 */


	setStyle () {
		let ratio = this.items.length / this.slidesVisible
		this.container.style.width = (ratio * 100) + "%"
		this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + "%")
	}

	createNavigation () {
		let nextButton = this.createDivWithClass('caroussel_next')
		let prevButton = this.createDivWithClass('caroussel_prev')
		this.root.appendChild (nextButton)
		this.root.appendChild (prevButton)
		nextButton.addEventListener('click', this.next.bind (this))
		prevButton.addEventListener('click', this.prev.bind (this))
	
	}

	next (){
		this.gotoSlide(this.currentSlide + this.slidesToScroll)

	}

	prev (){
		this.gotoSlide(this.currentSlide - this.slidesToScroll)

	}

	/**
	 *
	 * @param {number} index
	 */

	gotoSlide (index) {
		if (index < 0) {
			index = this.items.length - this.options.slidesVisible
		} else if (index >= this.items.length || (this.items[this.currentSlide + this.options.slidesVisible] === undefined && index > this.currentSlide)) {
			index = 0
		}
		let translateX = index * -100 / this.items.length
		this.container.style.transform = 'translate3d(' + translateX + '%, 0, 0)'
		this.currentSlide = index

	}



	onWindowResize () {
		let mobile = window.innerWidth < 800
		if (mobile !== this.isMobile) {
			this.isMobile = mobile
			this.setStyle ()
		}
	}


	/**
	 *
	 * @param {string} className
	 * @returns (HTMLElement)
	 */
	createDivWithClass (className) {
		let div = document.createElement('div')
		div.setAttribute('class', className)
		return div
	}

	get slidesToScroll() {
		return this.isMobile ? 1 : this.options.slidesToScroll
	}

	get slidesVisible() {
		return this.isMobile ? 1 : this.options.slidesVisible
	}
}
document.addEventListener('DOMContentLoaded', function () {

	new caroussel (document.querySelector('#caroussel1'), {
		slidesVisible: 1,
		slidesToScroll: 1
	})
})

