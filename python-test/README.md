# Demo with Python ans FastAPI


## Step to run
```
$pip install -r requirements.txt
$uvicorn main:app --reload
```

List of APIs
* API Docs :: http://127.0.0.1:8000/docs
* APIs
  * http://127.0.0.1:8000/
  * http://127.0.0.1:8000/items/1?q=123

## Testing with pytest and coverage
```
$pytest

$pytest --cov=main

$pytest --cov=main --cov-report=html
```

Open coverage file :: `htmlcov/index.html`