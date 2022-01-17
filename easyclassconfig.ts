import { Config  } from './types/config/index'

const CONFIG: Config = {
    "authorization": {
        "username": 'example',
        "email": "example@gmail.com",
        "password": "example",
    },
    "preference": {
        "find_word_in_chat": {
            "keyword": ['presente', 'keyword-example'] 
        },
    },
    "schedule": {
        "monday": [
            {
                "matter": "Example",
                "beginning": "00:00",
                "end": "00:00",
                "code": "aaa-aaaa-aaa"
            },
            {
                "matter": "Example",
                "beginning": "00:00",
                "end": "0:00",
                "code": "aaa-aaaa-aaa"
            }
            // (...)
        ],
        "tuesday": [
            {
                "matter": "Example",
                "beginning": "00:00",
                "end": "0:00",
                "code": "aaa-aaaa-aaa"
            }
        ],
        "wednesday": [
            {
                "matter": "Example",
                "beginning": "00:00",
                "end": "0:00",
                "code": "aaa-aaaa-aaa"
            }
        ],
        "thursday": [
            {
                "matter": "Example",
                "beginning": "00:00",
                "end": "0:00",
                "code": "aaa-aaaa-aaa"
            }
        ],
        "friday": [
            {
                "matter": "Example",
                "beginning": "00:00",
                "end": "0:00",
                "code": "aaa-aaaa-aaa"
            }
        ]
    }
}


export default CONFIG