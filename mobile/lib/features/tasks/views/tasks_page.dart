import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../controller/task_controller.dart';
import '../models/task.dart';
import '../../../core/theme/theme_controller.dart';
import '../../../features/accessibility/font_size_controller.dart';

class TasksPage extends StatelessWidget {
  const TasksPage({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Provider.of<TaskController>(context);

    return Scaffold(
      appBar: AppBar(title: const Text("MindEase")),

      drawer: Drawer(
        child: Consumer2<ThemeController, FontSizeController>(
          builder: (context, themeController, fontController, _) {
            return ListView(
              padding: EdgeInsets.zero,
              children: [
                const DrawerHeader(
                  child: Text("Configurações", style: TextStyle(fontSize: 20)),
                ),

                /// Dark Mode
                SwitchListTile(
                  title: const Text("Modo Escuro"),
                  value: themeController.isDark,
                  onChanged: (value) {
                    themeController.toggle(value);
                  },
                  secondary: const Icon(Icons.dark_mode),
                ),

                const Divider(),

                /// Controle de Fonte
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
                        onChanged: (value) {
                          fontController.setScale(value);
                        },
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

      body: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: TaskStatus.values.map((status) {
            final tasks = controller.tasksByStatus(status);

            return Container(
              width: 320,
              margin: const EdgeInsets.all(8),
              child: Column(
                children: [
                  /// Cabeçalho da coluna
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.primaryContainer,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: [
                        Text(
                          status.name == 'todo' ? "A Fazer" : status.name == 'doing' ? "Fazendo" : "Feito",
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text("${tasks.length} tarefas"),
                      ],
                    ),
                  ),

                  const SizedBox(height: 8),

                  /// Lista de tarefas
                  Expanded(
                    child: tasks.isEmpty
                        ? const Center(
                            child: Text(
                              "Sem tarefas",
                              style: TextStyle(color: Colors.grey),
                            ),
                          )
                        : ListView.builder(
                            shrinkWrap: true,
                            itemCount: tasks.length,
                            itemBuilder: (context, index) {
                              final task = tasks[index];

                              return Card(
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                elevation: 3,
                                margin: const EdgeInsets.symmetric(vertical: 6),
                                child: ListTile(
                                  title: Text(
                                    task.title,
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  subtitle: Text(task.description),

                                  /// Menu mover + excluir
                                  trailing: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      PopupMenuButton<TaskStatus>(
                                        icon: const Icon(Icons.swap_horiz),
                                        onSelected: (newStatus) {
                                          controller.changeStatus(
                                            task,
                                            newStatus,
                                          );
                                        },
                                        itemBuilder: (context) => TaskStatus
                                            .values
                                            .where((s) => s != status)
                                            .map(
                                              (statusOption) => PopupMenuItem(
                                                value: statusOption,
                                                child: Text(
                                                  "Mover para ${statusOption.name == 'todo' ? "A Fazer" : statusOption.name == 'doing' ? "Fazendo" : "Feito"}",
                                                ),
                                              ),
                                            )
                                            .toList(),
                                      ),
                                      IconButton(
                                        icon: const Icon(
                                          Icons.delete,
                                          color: Colors.red,
                                        ),
                                        onPressed: () {
                                          controller.removeTask(task);
                                        },
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            },
                          ),
                  ),
                ],
              ),
            );
          }).toList(),
        ),
      ),
    );
  }

  /// Modal para criar tarefa
  void _showAddTask(BuildContext context) {
    final titleController = TextEditingController();
    final descController = TextEditingController();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (_) {
        return Padding(
          padding: EdgeInsets.only(
            left: 16,
            right: 16,
            top: 16,
            bottom: MediaQuery.of(context).viewInsets.bottom + 16,
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                "Nova Tarefa",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),

              TextField(
                controller: titleController,
                decoration: const InputDecoration(
                  labelText: "Título",
                  border: OutlineInputBorder(),
                ),
              ),

              const SizedBox(height: 12),

              TextField(
                controller: descController,
                decoration: const InputDecoration(
                  labelText: "Descrição",
                  border: OutlineInputBorder(),
                ),
              ),

              const SizedBox(height: 16),

              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    if (titleController.text.isNotEmpty) {
                      Provider.of<TaskController>(
                        context,
                        listen: false,
                      ).addTask(titleController.text, descController.text);

                      Navigator.pop(context);
                    }
                  },
                  child: const Text("Adicionar"),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
