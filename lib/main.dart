import 'package:flutter/material.dart';
import 'package:flutter_overlay_window/flutter_overlay_window.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';

// 关闭远程云端链接，全部使用本地文件
late String localConfigPath;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'yyszx',
      theme: ThemeData.dark(),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

  @override
  void initState() {
    super.initState();
    initPath();
  }

  Future<void> initPath() async{
    final dir = await getExternalStorageDirectory();
    localConfigPath = "${dir!.path}/tiny.json";
  }

  //启动悬浮窗
  Future<void> startOverlay() async {
    bool perm = await FlutterOverlayWindow.isPermissionGranted();
    if(!perm){
      await FlutterOverlayWindow.requestPermission();
      return;
    }
    await FlutterOverlayWindow.showOverlay(
      enableDrag: true,
      width: 380,
      height: 480,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("yyszx主程序【本地版】")),
      body: Center(
        child: ElevatedButton(
          onPressed: startOverlay,
          child: const Text("打开悬浮窗口"),
        ),
      ),
    );
  }
}
