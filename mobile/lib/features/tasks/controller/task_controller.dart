import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:uuid/uuid.dart';
import '../models/task.dart';

class TaskController extends ChangeNotifier {
  final List<Task> _tasks = [];

  List<Task> get tasks => _tasks;

  TaskController() {
    loadTasks();
  }

  void addTask(String title, String description) {
    _tasks.add(
      Task(id: const Uuid().v4(), title: title, description: description),
    );
    saveTasks();
    notifyListeners();
  }

  void changeStatus(Task task, TaskStatus status) {
    task.status = status;
    saveTasks();
    notifyListeners();
  }

  List<Task> tasksByStatus(TaskStatus status) {
    return _tasks.where((t) => t.status == status).toList();
  }

  Future<void> saveTasks() async {
    final prefs = await SharedPreferences.getInstance();
    final taskList = _tasks.map((t) => t.toJson()).toList();
    await prefs.setStringList('tasks', taskList);
  }

  Future<void> loadTasks() async {
    final prefs = await SharedPreferences.getInstance();
    final taskList = prefs.getStringList('tasks');

    if (taskList != null) {
      _tasks.clear();
      _tasks.addAll(taskList.map((e) => Task.fromJson(e)));
      notifyListeners();
    }
  }

  void removeTask(Task task) {
    _tasks.removeWhere((t) => t.id == task.id);
    saveTasks();
    notifyListeners();
  }

  void updateStatus(Task task, TaskStatus newStatus) {
    if (newStatus == TaskStatus.deleted) {
      removeTask(task);
      return;
    }
    task.status = newStatus;
    saveTasks();
    notifyListeners();
  }
}
