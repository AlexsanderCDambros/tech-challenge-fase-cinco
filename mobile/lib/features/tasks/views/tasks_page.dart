import 'package:flutter/material.dart';
import 'package:mobile/features/focus_mode/focus_mode_controller.dart';
import 'package:mobile/features/tasks/models/task.dart';
import 'package:mobile/features/tasks/widgets/task_card.dart';
import 'package:provider/provider.dart';

import '../../../core/theme/theme_controller.dart';
import '../../../features/accessibility/font_size_controller.dart';
import '../../../features/pomodoro/pomodoro_widget.dart';
import '../controller/task_controller.dart';

class TasksPage extends StatelessWidget {
  const TasksPage({super.key});

  @override
  Widget build(BuildContext context) {
    final focusMode = context.watch<FocusModeController>().isFocusMode;

    return Scaffold(
      appBar: AppBar(title: const Text("FocusBoard")),

      // ===========================
      // DRAWER
      // ===========================
      drawer: Drawer(
        child:
            Consumer3<ThemeController, FontSizeController, FocusModeController>(
              builder:
                  (
                    context,
                    themeController,
                    fontController,
                    focusController,
                    _,
                  ) {
                    return ListView(
                      padding: EdgeInsets.zero,
                      children: [
                        const DrawerHeader(
                          child: Text(
                            "Configurações",
                            style: TextStyle(fontSize: 20),
                          ),
                        ),

                        /// 🌙 Dark Mode
                        SwitchListTile(
                          title: const Text("Modo Escuro"),
                          value: themeController.isDark,
                          onChanged: themeController.toggle,
                          secondary: const Icon(Icons.dark_mode),
                        ),

                        /// 🎯 Modo Foco (não persistente)
                        SwitchListTile(
                          title: const Text("Modo Foco"),
                          value: focusController.isFocusMode,
                          onChanged: focusController.toggle,
                          secondary: const Icon(Icons.center_focus_strong),
                        ),

                        const Divider(),

                        /// 🔠 Controle de Fonte
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                "Tamanho da Fonte",
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                              Slider(
                                value: fontController.scale,
                                min: 0.8,
                                max: 1.5,
                                divisions: 7,
                                label: fontController.scale.toStringAsFixed(1),
                                onChanged: fontController.setScale,
                              ),
                            ],
                          ),
                        ),
                      ],
                    );
                  },
            ),
      ),

      floatingActionButton: FloatingActionButton(
        onPressed: () => _showAddTask(context),
        child: const Icon(Icons.add),
      ),

      // ===========================
      // BODY DINÂMICO
      // ===========================
      body: Column(
        children: [
          if (focusMode) const PomodoroWidget(),

          Expanded(
            child: focusMode
                ? _buildFocusBoard(context)
                : _buildFullBoard(context),
          ),

          if (!focusMode) const PomodoroWidget(),
        ],
      ),
    );
  }

  // ===========================
  // BOARD COMPLETO (Modo Normal)
  // ===========================
  Widget _buildFullBoard(BuildContext context) {
    final controller = context.watch<TaskController>();

    final todo = controller.tasks
        .where((t) => t.status == TaskStatus.todo)
        .toList();

    final inProgress = controller.tasks
        .where((t) => t.status == TaskStatus.doing)
        .toList();

    final done = controller.tasks
        .where((t) => t.status == TaskStatus.done)
        .toList();

    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildColumn("A Fazer", todo),
          _buildColumn("Fazendo", inProgress),
          _buildColumn("Feito", done),
        ],
      ),
    );
  }

  // ===========================
  // APENAS IN PROGRESS (Modo Foco)
  // ===========================
  Widget _buildFocusBoard(BuildContext context) {
    final controller = context.watch<TaskController>();

    final inProgress = controller.tasks
        .where((t) => t.status == TaskStatus.doing)
        .toList();

    return Center(
      child: SizedBox(width: 400, child: _buildColumn("Em Foco", inProgress)),
    );
  }

  // ===========================
  // COLUNA PADRÃO
  // ===========================
  Widget _buildColumn(String title, List<Task> tasks) {
    return SizedBox(
      width: 320,
      child: Card(
        margin: const EdgeInsets.all(12),
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(12),
              child: Text(
                title,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            Expanded(
              child: ListView.builder(
                itemCount: tasks.length,
                itemBuilder: (context, index) {
                  return TaskCard(task: tasks[index]);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  // ===========================
  // MODAL NOVA TASK
  // ===========================
  void _showAddTask(BuildContext context) {
    final controller = context.read<TaskController>();
    final titleController = TextEditingController();
    final descriptionController = TextEditingController();

    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text("Nova Tarefa"),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: titleController,
              decoration: const InputDecoration(hintText: "Digite a tarefa"),
            ),
            const SizedBox(height: 8),
            TextField(
              controller: descriptionController,
              decoration: const InputDecoration(hintText: "Digite a descrição"),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cancelar"),
          ),
          ElevatedButton(
            onPressed: () {
              controller.addTask(titleController.text, descriptionController.text);
              Navigator.pop(context);
            },
            child: const Text("Adicionar"),
          ),
        ],
      ),
    );
  }
}
