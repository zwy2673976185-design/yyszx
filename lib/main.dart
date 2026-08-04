import 'package:flutter/material.dart';
import 'package:flutter_overlay_window/flutter_overlay_window.dart';
import 'package:dio/dio.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';

// Github CDN读取tiny.json
const String configUrl = "https://cdn.jsdelivr.net/gh/zwy2673976185-design/yyy/tiny.json";
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
      appBar: AppBar(title: const Text("yyszx主程序")),
      body: Center(
        child: ElevatedButton(
          onPressed: startOverlay,
          child: const Text("打开悬浮窗口"),
        ),
      ),
    );
  }
}
