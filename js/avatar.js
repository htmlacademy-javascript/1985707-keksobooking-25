const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFile = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const offerFile = document.querySelector('.ad-form__upload input[type=file]');
const offerPreview = document.querySelector('.ad-form__photo');

const getMatchesFileTypes = (file) => {
  file = file.files[0];
  const fileName = file.name.toLowerCase();

  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

avatarFile.addEventListener('change', () => {
  if (getMatchesFileTypes(avatarFile)) {
    avatarPreview.src = URL.createObjectURL(avatarFile.files[0]);
  }
});

offerFile.addEventListener('change', () => {
  if (getMatchesFileTypes(offerFile)) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(offerFile.files[0]);
    img.style.width = '100%';
    img.style.height = '100%';
    offerPreview.innerHTML = '';
    offerPreview.appendChild(img);
  }
});
