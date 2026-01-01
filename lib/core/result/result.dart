sealed class Result<T> {
  const Result();

  bool get isSuccess => this is Success<T>;
  bool get isFailure => this is Failure<T>;

  T? get dataOrNull => this is Success<T> ? (this as Success<T>).data : null;
  AppError? get errorOrNull => this is Failure<T> ? (this as Failure<T>).error : null;
}

class Success<T> extends Result<T> {
  final T data;
  const Success(this.data);
}

class Failure<T> extends Result<T> {
  final AppError error;
  const Failure(this.error);
}

enum AppErrorType {
  network,
  timeout,
  unauthorized,
  notFound,
  parsing,
  unknown,
}

class AppError {
  final AppErrorType type;
  final String? message;
  final dynamic originalError;

  AppError({
    required this.type,
    this.message,
    this.originalError,
  });

  @override
  String toString() => 'AppError(type: $type, message: $message)';
}
