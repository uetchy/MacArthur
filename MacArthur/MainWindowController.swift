//
//  MainWindowController.swift
//  MacArthur
//
//  Created by Yasuaki Uechi on 16/8/22.
//  Copyright © 2016 Yasuaki Uechi. All rights reserved.
//

import Cocoa

class MainWindowController: NSWindowController {

    override func windowDidLoad() {
        super.windowDidLoad()
        let window = self.window!
//        let storyboard = self.storyboard!
        window.titleVisibility = .Hidden
        
    }
}
