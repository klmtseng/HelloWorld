import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
from sklearn.model_selection import TimeSeriesSplit
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_squared_error


def load_data(path: str) -> pd.Series:
    """Load daily closing prices from a CSV file."""
    df = pd.read_csv(path, parse_dates=["Date"], index_col="Date")
    return df["Close"]


def rolling_arima_forecast(series: pd.Series, order=(5, 1, 2), splits=5):
    tscv = TimeSeriesSplit(n_splits=splits)
    forecasts = []
    for train_index, test_index in tscv.split(series):
        train = series.iloc[train_index]
        model = ARIMA(train, order=order).fit()
        forecast = model.forecast(steps=len(test_index))
        forecasts.append(forecast)
    return pd.concat(forecasts)


def ml_forecast(series: pd.Series, splits=5):
    df = pd.DataFrame({"Close": series})
    df["Return"] = df["Close"].pct_change()
    df["Lag1"] = df["Return"].shift(1)
    df["MA10"] = df["Close"].rolling(window=10).mean()
    df.dropna(inplace=True)

    X = df[["Lag1", "MA10"]]
    y = df["Return"].shift(-1).dropna()
    X = X.iloc[:-1]

    tscv = TimeSeriesSplit(n_splits=splits)
    pred = []
    for train_index, test_index in tscv.split(X):
        X_train, X_test = X.iloc[train_index], X.iloc[test_index]
        y_train = y.iloc[train_index]
        model = GradientBoostingRegressor()
        model.fit(X_train, y_train)
        pred.append(pd.Series(model.predict(X_test), index=y.iloc[test_index].index))
    return pd.concat(pred)


if __name__ == "__main__":
    price_series = load_data("data/index_daily.csv")
    arima_pred = rolling_arima_forecast(price_series)
    ml_pred = ml_forecast(price_series)

    combined = 0.5 * arima_pred.loc[ml_pred.index] + 0.5 * ml_pred
    rmse = mean_squared_error(price_series.loc[combined.index], combined, squared=False)
    print(f"Combined RMSE: {rmse:.4f}")
