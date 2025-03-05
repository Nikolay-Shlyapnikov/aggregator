import React from 'react';
import {store} from "../utils/store/store";
import {address} from "../app/config";
import {fetch} from "../utils/request/API";

export const MainPage = () => {
    const handleFileChange = (files: FileList | undefined | null) => {
        const form = new FormData()
        if (files) {
            for (let i = 0; i < files.length; i++) {
                if (files[i].type.startsWith('image/')) {
                    form.set(`${i}`, files[i]);
                }
            }
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
    };

    return (
      <div>
          <input
              type='file'
              multiple={true}
              onChange={(event) => {handleFileChange(event.target.files)}}
                  />
      </div>
    )
}

