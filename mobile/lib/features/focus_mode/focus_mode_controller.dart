import 'package:flutter/material.dart';

class FocusModeController extends ChangeNotifier {
  bool _isFocusMode = false;

  bool get isFocusMode => _isFocusMode;

  void toggle(bool value) {
    _isFocusMode = value;
    notifyListeners();
  }
}