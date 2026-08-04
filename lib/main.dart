import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
import 'package:path_provider/path_provider.dart';
import 'dart:io';

const String configUrl = "https://yyszx-1375389211.cos.ap-shanghai.myqcloud.com/tiny.json";

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
  String logText = "启动完成，本地模式";
  String localPath = "/storage/emulated/0/写着玩/yyszx_app/";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("yyszx")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text("本地路径：$localPath"),
            const SizedBox(height:12),
            Expanded(child: SingleChildScrollView(child:Text(logText))),
          ],
        ),
      ),
    );
  }
}
