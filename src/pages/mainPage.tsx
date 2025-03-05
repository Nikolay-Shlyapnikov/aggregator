import React, {ChangeEvent} from 'react';
import {store} from "../utils/store/store";
import {address} from "../app/config";
import {fetch} from "../utils/request/API";

export const MainPage = () => {
    const [id, setId] = React.useState<string>('');
    const [files, setFiles] = React.useState<FileList | null>(null);
    const handleFileChange = (value: FileList | undefined | null) => {

        if (value) {
           setFiles(value)
        }
    };

    const handleInputChange =  (event: ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value)
    }

    const handleSubmit = () => {
        if (files && id) {
            const form = new FormData()
            form.set('id', id);
            Array.from(files).forEach((file, index) =>    form.set(`${index}`, file))

            fetch('post',`${address}/manga`, {
                params: form,
                headers: {
                    token: store.getState().user.token
                }
            }, (response)=> {

                if (response.data) {
                    console.log({response});
                } else {
                    console.error(response)
                }
            });
        }

    }

    return (
      <div>
          <input
              type='file'
              multiple={true}
              onChange={(event) => {handleFileChange(event.target.files)}}
                  />
          <input
            type='text'
            onChange={handleInputChange}
            placeholder='Введите id'
          />
          <button
            onClick={handleSubmit}
          >
              Отправить
          </button>
      </div>
    )
}

