import 'package:flutter/material.dart';
import 'package:mobile/features/accessibility/font_size_controller.dart';
import 'package:mobile/features/focus_mode/focus_mode_controller.dart';
import 'package:mobile/features/pomodoro/pomodoro_controller.dart';
import 'package:provider/provider.dart';
import 'core/theme/theme_controller.dart';
import 'features/tasks/controller/task_controller.dart';
import 'features/tasks/views/tasks_page.dart';

void main() {
  runApp(const FocusBoardApp());
}

class FocusBoardApp extends StatelessWidget {
  const FocusBoardApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeController()),
        ChangeNotifierProvider(create: (_) => TaskController()),
        ChangeNotifierProvider(create: (_) => FontSizeController()),
        ChangeNotifierProvider(create: (_) => PomodoroController()),
        ChangeNotifierProvider(create: (_) => FocusModeController()),
      ],
      child: Consumer2<ThemeController, FontSizeController>(
        builder: (context, themeController, fontController, _) {
          return MaterialApp(
            debugShowCheckedModeBanner: false,
            themeMode: themeController.mode,
            theme: ThemeData.light(useMaterial3: true),
            darkTheme: ThemeData.dark(useMaterial3: true),
            builder: (context, child) {
              return MediaQuery(
                data: MediaQuery.of(
                  context,
                ).copyWith(textScaleFactor: fontController.scale),
                child: child!,
              );
            },
            home: const TasksPage(),
          );
        },
      ),
    );
  }
}
