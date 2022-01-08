import { Config  } from './types/config/index'

const CONFIG: Config = {
    authorization: {
        "username": 'example',
        "mail": 'example@gmail.com',
        "password": 'example',
    },
    schedule: {
        "monday": [
            {
                "matter": "Example",
                "beginning": "00:00",
                "end": "24:00",
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