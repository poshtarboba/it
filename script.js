(() => {

	/* хедер */
	initContentsHeader();

	function add0(n) {
		return n < 10 ? '0' + n : n.toString();
	}

	function initContentsHeader(){
		let isContentsPage = document.body.classList.contains('contents-page');
		if (isContentsPage) {
			let contentsPageFile = document.location.pathname.split('/').pop();
			localStorage.setItem('contentsPage', contentsPageFile);
		}
		let contentsPageFile = localStorage.getItem('contentsPage');
		if (!isContentsPage && contentsPageFile) {
			fetch(contentsPageFile).then(resp => resp.text()).then(html => {
				let box = document.createElement('div');
				box.innerHTML = html;
				let currentPageFile = document.location.pathname.split('/').pop();
				let links = box.querySelectorAll('.parts a');
				let currentPageIndex = links.findIndex(e => e.getAttribute('href') === currentPageFile);
				if (currentPageIndex < 0) return;
				html = '<p class="prev-next-links">';
				let href, text;
				if (currentPageIndex > 0) {
					let link = links[currentPageIndex - 1];
					href = link.getAttribute('href');
					text = link.innerText;
					html += '<a href="'+ href +'" class="prev">' + text + '</a> ';
				}
				html += '<a href="' + contentsPageFile + '">Зміст</a>';
				if (currentPageIndex < links.length - 1) {
					let link = links[currentPageIndex + 1];
					href = link.getAttribute('href');
					text = link.innerText;
					html += ' <a href="'+ href +'" class="next">' + text + '</a>';
				}
				html += '</p>';
				let header = document.createElement('div');
				header.classList.add('header-autohide');
				header.innerHTML = html;
				document.body.appendChild(header);
				showHideContentsHeader(header);
			});
		}
	}

	function showHideContentsHeader(header){
		/*
			TODO: поставити затримку, відстежувати координати
			якщо курсор покинув вікно чи сповз вниз - меню не відображати
		*/
		window.addEventListener('mousemove', function(e){
			headerShown = header.classList.contains('show');
			if (e.clientY > 200 && headerShown) header.classList.remove('show');
			if (e.clientX > window.innerWidth - 100 && e.clientY < 50 && !headerShown) header.classList.add('show');
		});
	}
	
})();
