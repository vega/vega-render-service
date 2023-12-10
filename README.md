# Vega Service to Generate Images

[![Build Status](https://github.com/vega/vega-render-service/workflows/Test/badge.svg)](https://github.com/vega/vega-render-service/actions)

**Deprecated. Please use https://github.com/jonmmease/vl-convert-service.**

Deployed at https://render-vega.vercel.app/. We will update the service with new version of Vega and Vega-Lite and change the API.

## Dev Setup

Install dependencies with `yarn`.

## Development Instructions

1. Clone the repository.
    ```
    $ git clone git@github.com:vega/vega-render-service.git
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
    $ scripts/savePdf.sh
    ```

6.  Go to the home route (which usually is `http://localhost:8090/`). Otherwise
    it will be mentioned in the console where the above command is run.
    
## Documentation

You can find examples at in [`scripts`](https://github.com/vega/vega-render-service/tree/master/scripts).

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
