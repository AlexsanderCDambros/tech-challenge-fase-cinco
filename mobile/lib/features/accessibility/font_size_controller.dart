import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class FontSizeController extends ChangeNotifier {
  double _scale = 1.0;

  double get scale => _scale;

  FontSizeController() {
    loadFontSize();
  }

  void setScale(double value) async {
    _scale = value;

    final prefs = await SharedPreferences.getInstance();
    await prefs.setDouble('fontScale', value);

    notifyListeners();
  }

  void loadFontSize() async {
    final prefs = await SharedPreferences.getInstance();
    _scale = prefs.getDouble('fontScale') ?? 1.0;
    notifyListeners();
  }
}