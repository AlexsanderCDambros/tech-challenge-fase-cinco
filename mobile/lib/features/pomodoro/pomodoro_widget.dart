import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'pomodoro_controller.dart';

class PomodoroWidget extends StatelessWidget {
  const PomodoroWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<PomodoroController>(
      builder: (context, controller, _) {
        return Card(
          margin: const EdgeInsets.all(12),
          elevation: 4,
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  controller.isBreak ? "Intervalo" : "Foco",
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 8),
                Text(
                  controller.formattedTime,
                  style: Theme.of(context)
                      .textTheme
                      .displayMedium
                      ?.copyWith(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    IconButton(
                      icon: Icon(
                        controller.isRunning
                            ? Icons.pause
                            : Icons.play_arrow,
                      ),
                      onPressed: () {
                        controller.isRunning
                            ? controller.pause()
                            : controller.start();
                      },
                    ),
                    IconButton(
                      icon: const Icon(Icons.refresh),
                      onPressed: controller.reset,
                    ),
                  ],
                )
              ],
            ),
          ),
        );
      },
    );
  }
}