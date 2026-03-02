import 'dart:async';
import 'package:flutter/material.dart';

class PomodoroController extends ChangeNotifier {
  static const int workDuration = 25 * 60;
  static const int breakDuration = 5 * 60;

  int _secondsRemaining = workDuration;
  bool _isRunning = false;
  bool _isBreak = false;

  Timer? _timer;

  int get secondsRemaining => _secondsRemaining;
  bool get isRunning => _isRunning;
  bool get isBreak => _isBreak;

  String get formattedTime {
    final minutes = _secondsRemaining ~/ 60;
    final seconds = _secondsRemaining % 60;
    return '${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}';
  }

  void start() {
    if (_isRunning) return;

    _isRunning = true;
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (_secondsRemaining > 0) {
        _secondsRemaining--;
      } else {
        _switchMode();
      }
      notifyListeners();
    });

    notifyListeners();
  }

  void pause() {
    _timer?.cancel();
    _isRunning = false;
    notifyListeners();
  }

  void reset() {
    _timer?.cancel();
    _isRunning = false;
    _isBreak = false;
    _secondsRemaining = workDuration;
    notifyListeners();
  }

  void _switchMode() {
    _isBreak = !_isBreak;
    _secondsRemaining = _isBreak ? breakDuration : workDuration;
  }
}