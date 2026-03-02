import 'dart:convert';

enum TaskStatus { todo, doing, done, deleted }

class Task {
  final String id;
  final String title;
  final String description;
  TaskStatus status;

  Task({
    required this.id,
    required this.title,
    required this.description,
    this.status = TaskStatus.todo,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'status': status.index,
    };
  }

  factory Task.fromMap(Map<String, dynamic> map) {
    return Task(
      id: map['id'],
      title: map['title'],
      description: map['description'],
      status: TaskStatus.values[map['status']],
    );
  }

  String toJson() => json.encode(toMap());

  factory Task.fromJson(String source) =>
      Task.fromMap(json.decode(source));
}