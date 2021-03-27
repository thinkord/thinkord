const fs = require("fs");

export default class Audio{
    static get toolbox() {
        return {
            title: 'Audio',
            icon: '<svg width="17" height="15" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="microphone" class="svg-inline--fa fa-microphone fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z"></path></svg>'
        };
    }

    constructor({data, api}){
        this.api = api;
        this.data = data;
        this.wrapper = undefined;
        this.button = undefined;
        this.file = undefined;
    }

    render() {
        const holder = this.make('div', this.api.styles.block);
        this.wrapper = this.make('div', "audio-block");
    
        if (this.data && this.data.url) {
            this.showFileData();
        } else {
            this.prepareUploadButton();
        }
    
        holder.appendChild(this.wrapper);
    
        return holder;
    }

    prepareUploadButton() {
        this.button = this.make('label', 'label');

        this.file = this.make('input', null, {"type": "file", "accept": ".mp3, .mdi, .wma"});
        this.file.addEventListener('change', (event) => this.handleFileUpload(event));

        const text = this.make('span')
        text.innerHTML = "Select a Audio File"
        this.button.appendChild(this.file);
        this.button.appendChild(text);
        this.wrapper.appendChild(this.button);
    }

    showFileData() {
        this.wrapper.classList.add("wrapperWithFile");

        const audio = this.make('audio', null, {"controls": ""});
        const source = this.make('source');

        source.src = this.data.url;
        audio.appendChild(source);

        this.wrapper.appendChild(audio);
    }

    handleFileUpload(event) {
        console.log(this.file.files[0])
        fs.copyFile(this.file.files[0].path, "../../../../../public/media/audio", err => {
            console.log(err)
        })
        this.data = {url: `http://localhost:3000/media/image/${this.file.files[0].name}`}
        this.button.remove();
        this.showFileData();
    }

    save(blockContent){
        if(this.data && this.data.url){
            const source = blockContent.querySelector('source').src;
            this.data = {url: source}
        }
        return this.data
    }

    validate(savedData){
        if(this.data && this.data.url){
            if (savedData.url.trim()){
                return true;
            }
        }
        return false;
    }

    /**
   * Helper method for elements creation
   * @param tagName
   * @param classNames
   * @param attributes
   * @return {HTMLElement}
   */
    make(tagName, classNames = null, attributes = {}) {
        const el = document.createElement(tagName);

        if (Array.isArray(classNames)) {
            el.classList.add(...classNames);
        } else if (classNames) {
            el.classList.add(classNames);
        }

        for (const attrName in attributes) {
            el.setAttribute(attrName, attributes[attrName]);
        }

        return el;
    }
}