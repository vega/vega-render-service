[![Build Status](https://travis-ci.com/vega/vega-render-service.svg?branch=master)](https://travis-ci.com/vega/vega-render-service)
# Vega Service to Generate Images

## Dev Setup

Install dependencies with `yarn`.

## Development Instructions

1. Clone the repository.
    ```
    $ git clone git@github.com:vega/editor-pdf-service.git
    ```

2. Install all dependencies.
    ```
    $ yarn install
    ```
3.  Run the back-end server.
    ```
    $ yarn start
    ```
    
4. Run sample test command
    ``` 
    $ ./savePdf.sh
    ```

6.  Go to the home route (which usually is `http://localhost:8080/`). Otherwise
    it will be mentioned in the console where the above command is run.
    
## Documentation

```
    /handle : to return a pdf/png/svg file
    Params:
        ++ Request Body:
            A JSON spec with the form of 
            {
                "specs": {
                    "$schema": "https://vega.github.io/schema/vega/v5.json",
                    "width": 400,
                    "height": 200,
                    ...
                }
            }
            
        ++ Request Headers:
            Content-Type: application/json
            Accept: image/png OR application/pdf or image/svg
           
```
