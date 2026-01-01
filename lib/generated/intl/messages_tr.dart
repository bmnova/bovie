// DO NOT EDIT. This is code generated via package:intl/generate_localized.dart
// This is a library that provides messages for a tr locale. All the
// messages from the main program should be duplicated here with the same
// function name.

// Ignore issues from commonly used lints in this file.
// ignore_for_file:unnecessary_brace_in_string_interps, unnecessary_new
// ignore_for_file:prefer_single_quotes,comment_references, directives_ordering
// ignore_for_file:annotate_overrides,prefer_generic_function_type_aliases
// ignore_for_file:unused_import, file_names, avoid_escaping_inner_quotes
// ignore_for_file:unnecessary_string_interpolations, unnecessary_string_escapes

import 'package:intl/intl.dart';
import 'package:intl/message_lookup_by_library.dart';

final messages = new MessageLookup();

typedef String MessageIfAbsent(String messageStr, List<dynamic> args);

class MessageLookup extends MessageLookupByLibrary {
  String get localeName => 'tr';

  final messages = _notInlinedMessages(_notInlinedMessages);
  static Map<String, Function> _notInlinedMessages(_) => <String, Function>{
        "appName": MessageLookupByLibrary.simpleMessage("Bovie"),
        "continueText": MessageLookupByLibrary.simpleMessage("Devam Et"),
        "failedToLoadGenres":
            MessageLookupByLibrary.simpleMessage("Türler yüklenemedi"),
        "failedToLoadMovies":
            MessageLookupByLibrary.simpleMessage("Filmler yüklenemedi"),
        "finish": MessageLookupByLibrary.simpleMessage("Bitir"),
        "home": MessageLookupByLibrary.simpleMessage("Ana Sayfa"),
        "limitReachedGenres": MessageLookupByLibrary.simpleMessage(
            "En fazla 2 tür seçebilirsiniz"),
        "limitReachedMovies": MessageLookupByLibrary.simpleMessage(
            "En fazla 3 film seçebilirsiniz"),
        "paywall": MessageLookupByLibrary.simpleMessage("Ödeme Duvarı"),
        "pick2Genres": MessageLookupByLibrary.simpleMessage("2 Tür Seç"),
        "pick3Movies": MessageLookupByLibrary.simpleMessage("3 Film Seç"),
        "retry": MessageLookupByLibrary.simpleMessage("Tekrar Dene"),
        "splashError": MessageLookupByLibrary.simpleMessage(
            "Başlatma sırasında bir hata oluştu")
      };
}
