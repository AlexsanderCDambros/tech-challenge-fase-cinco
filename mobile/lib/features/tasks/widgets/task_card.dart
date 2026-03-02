import 'package:flutter/material.dart';
import 'package:mobile/features/tasks/models/task.dart';
import 'package:provider/provider.dart';
import '../controller/task_controller.dart';

class TaskCard extends StatelessWidget {
  final Task task;

  const TaskCard({super.key, required this.task});

  @override
  Widget build(BuildContext context) {
    final controller = context.read<TaskController>();

    return Card(
      margin: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              task.title,
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 6),
            Text(
              task.description,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 10),
            Align(
              alignment: Alignment.centerRight,
              child: PopupMenuButton<TaskStatus>(
                onSelected: (status) {
                  controller.updateStatus(task, status);
                },
                itemBuilder: (_) => const [
                  PopupMenuItem(
                    value: TaskStatus.todo,
                    child: Text("Mover para A Fazer"),
                  ),
                  PopupMenuItem(
                    value: TaskStatus.doing,
                    child: Text("Mover para Fazendo"),
                  ),
                  PopupMenuItem(
                    value: TaskStatus.done,
                    child: Text("Mover para Feito"),
                  ),
                  PopupMenuItem(
                    value: TaskStatus.deleted,
                    child: Text("Excluir tarefa"),
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}