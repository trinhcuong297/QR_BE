## API tree
    .
    ├── /                               
    ├── /Home                    
    │   ├── /All/:user           (GET)                |  get all device controler and data by :user (username)
    │   ├── /:user               (GET)                |  get all device by :user (username)
    ├── /DeviceControl                    
    │   ├── /:friendly_name      (GET)                |  get all device data by friendly_name       
    │   ├── /control             (POST)               |  control device by publishing mqtt news
    ├── /User   
    │   ├── /login               (POST)               |  Login method
    │   ├── /signup              (POST)               |  Sign Up method
    ├── /Device_Owner   
    │   ├── /addDevice           (POST)               |  Add device to user
    │   ├── /removeDevice        (POST)               |  Remove device


    
                   
