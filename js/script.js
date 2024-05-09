const addBtn = document.querySelector('.add');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteBtns = document.getElementsByClassName('delete-note');
const deleteAllBtn = document.querySelector('.delete-all');

const noteArea = document.querySelector('.note-area');
const notePanel = document.querySelector('.note-panel');
const textarea = document.querySelector('#text');
const category = document.querySelector('#category');
const error = document.querySelector('.error');

const deleteAskPopup = document.querySelector('.delete-all-popup');
const deleteAllConfirmBtn = document.querySelector('.popup-confirm');
const deleteAllCancelBtn = document.querySelector('.popup-cancel');

const noteCounts = {
	Shopping: 0,
	Work: 0,
	School: 0,
	Home: 0,
	Important: 0,
	Other: 0,
};

let selectedValue;

let cardID = 0;

const openPanel = () => {
	notePanel.style.display = 'flex';
};
const closePanel = () => {
	notePanel.style.display = 'none';
	error.style.visibility = 'hidden';
	textarea.value = '';
	category.selectedIndex = 0;
};

const addNote = () => {
	if (textarea.value !== '' && selectValue() !== '0') {
		createNote();
		error.style.visibility = 'hidden';
	} else {
		error.style.visibility = 'visible';
	}
};
const createNote = () => {
	const newNote = document.createElement('div');
	newNote.classList.add('note');
	newNote.setAttribute('id', cardID);

	const categoryCount = ++noteCounts[selectedValue];

	newNote.innerHTML = `
    <div class="note__header">
    <h3 class="note-title">${selectedValue} #${categoryCount}</h3>
    <button class="delete-note" onclick="deleteNote(${cardID})">
        <i class="fas fa-times "></i>
    </button>
    </div>

    <div class="note__body">
    ${textarea.value}
    </div>
    `;
	noteArea.appendChild(newNote);
	cardID++;
	textarea.value = '';
	category.selectedIndex = 0;
	notePanel.style.display = 'none';
	checkColor(newNote);
};

const selectValue = () => {
	selectedValue = category.options[category.selectedIndex].text;
};
const checkColor = note => {
	switch (selectedValue) {
		case 'Shopping':
			note.style.backgroundColor = 'rgba(202, 236, 181, 0.7)';
			break;
		case 'Work':
			note.style.backgroundColor = 'rgba(255, 255, 0, 0.7)';
			break;
		case 'School':
			note.style.backgroundColor = 'rgba(0, 255, 255, 0.7)';
			break;
		case 'Home':
			note.style.backgroundColor = 'rgba(255, 165, 0, 0.7)';
			break;
		case 'Important':
			note.style.backgroundColor = 'rgba(255, 0, 0, 0.6)';
			break;
		case 'Other':
			note.style.backgroundColor = 'rgba(189, 189, 189, 0.7)';
			break;
	}
};

const deleteNote = id => {
	const noteToDelete = document.getElementById(id);
	noteArea.removeChild(noteToDelete);
};

const deleteAll = () => {
	const notes = noteArea.getElementsByClassName('note');
	if (notes.length > 0) {
		deleteAskPopup.style.display = 'block';
		resetNoteCounts()
	}
};
const deleteAllNotesConfirm = () => {
	noteArea.textContent = '';
	deleteAskPopup.style.display = 'none';
};
const showPopup = () => {
	if (!(deleteAskPopup.style.display === 'block')) {
		deleteAskPopup.style.display = 'block';
	} else {
		deleteAskPopup.style.display = 'none';
	}
};

const resetNoteCounts = () => {
	for (const category in noteCounts) {
		noteCounts[category] = 0;
	}
};

addBtn.addEventListener('click', openPanel);
cancelBtn.addEventListener('click', closePanel);
saveBtn.addEventListener('click', addNote);
deleteAllBtn.addEventListener('click', deleteAll);
deleteAllConfirmBtn.addEventListener('click', deleteAllNotesConfirm);
deleteAllCancelBtn.addEventListener('click', showPopup);
window.addEventListener('click', e =>
	e.target === deleteAskPopup ? showPopup() : false
);
